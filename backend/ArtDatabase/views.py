from ArtDatabase.models import (
    Painting, Gallery, GalleryPainting,
    Portfolio, PortfolioPainting, PaintingImage, PurchaseOrder
)
from ArtDatabase.serializers import (
    PaintingSerializer, GallerySerializer, GalleryPaintingSerializer,
    PortfolioSerializer, PortfolioPaintingSerializer,PaintingImageSerializer, CheckoutSerializer,
    CheckoutSessionSerializer, PurchaseOrderSerializer
)
from backend.settings import SECRET_STRIPE_KEY
from backend.settings import STRIPE_WEBHOOK_SECRET
from backend.settings import EMAIL_HOST_USER
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
import json
import logging
from django.db import transaction
from dotenv import load_dotenv
import os
from djstripe import settings as djstripe_settings
import stripe
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


load_dotenv()
stripe.api_key = djstripe_settings.djstripe_settings.STRIPE_SECRET_KEY
endpoint_secret = STRIPE_WEBHOOK_SECRET  # from Stripe Dashboard
logger = logging.getLogger(__name__)

SHIPPING_RATE_DICT = {
    "standard": 'shr_1RkuxHP3msuX5JsQ1osRn4XC',
    'pickup': 'shr_1RvsM9P3msuX5JsQLejCViCY'
}

# Gives all paintings
class PaintingList(generics.ListCreateAPIView):    
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

    def post(self, request, *args, **kwargs):
        logger.info("Posting to paintnig")
        # Create Painting object
        painting = Painting.objects.create(
            name=request.data.get("name"),
            description=request.data.get("description"),
            price=request.data.get("price"),
            width=request.data.get("width"),
            height=request.data.get("height"),
            forSale=request.data.get("forSale") == 'true',
            sold=request.data.get("sold") == 'true',
        )

        # Get files
        files = request.FILES.getlist("images")
        metadata = json.loads(request.data.get("image_metadata", "[]"))
        for i, file in enumerate(files):
            order = metadata[i]["order"]
            PaintingImage.objects.create(
                painting=painting,
                image=file,
                order=order
            )
        return Response({"message": "Painting and images created"}, status=status.HTTP_201_CREATED)
    
    

# Gives details of individual paintings
class PaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer
    parser_classes = [MultiPartParser, FormParser]  # Required to handle FormData

    def put(self, request, *args, **kwargs):
        logger.info("Putting to painting detail")

        # Get the existing painting object
        painting = self.get_object()

        # Update fields manually (or pass to serializer)
        painting.name = request.data.get("name", painting.name)
        painting.description = request.data.get("description", painting.description)
        painting.price = request.data.get("price", painting.price)
        painting.width = request.data.get("width", painting.width)
        painting.height = request.data.get("height", painting.height)
        painting.forSale = request.data.get("forSale", painting.forSale) == 'true'
        painting.sold = request.data.get("sold", painting.sold) == 'true'
        painting.save()

        # Optional: Clear existing images
        painting.images.all().delete()

        # Add new images (if any)
        files = request.FILES.getlist("images")
        metadata = json.loads(request.data.get("image_metadata", "[]"))

        for i, file in enumerate(files):
            order = metadata[i]["order"] if i < len(metadata) else i + 1
            PaintingImage.objects.create(
                painting=painting,
                image=file,
                order=order
            )

        return Response({"message": "Painting updated with images"}, status=status.HTTP_200_OK)
    
    
# Gives all images in the database
class PaintingImageList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PaintingImage.objects.all()
    serializer_class = PaintingImageSerializer

class PaintingImageDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PaintingImage.objects.all()
    serializer_class = PaintingImageSerializer

# gives all galleries and elements in galleries
class GalleryList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

# gives all paintings and positions of paintings in specific galleries
class GalleryDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

# gets all paintings in a gallery
class GalleryPaintingList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = GalleryPainting.objects.all()
    serializer_class = GalleryPaintingSerializer

    def create(self, request, *args, **kwargs):
        logger.info("creating a gallery painting")
        # Get the painting and gallery objects
        painting = Painting.objects.get(id=request.data.get('painting'))
        gallery = Gallery.objects.get(id=request.data.get('gallery'))
        
        # Create the gallery painting
        gallery_painting = GalleryPainting.objects.create(
            paintings=painting,
            galleries=gallery,
            Xpos=request.data.get('Xpos', 0),
            Ypos=request.data.get('Ypos', 0)
        )
        
        serializer = self.get_serializer(gallery_painting)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# gets painting details of specific paintings in galleries
class GalleryPaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = GalleryPainting.objects.all()
    serializer_class = GalleryPaintingSerializer

# This gives a list of all portfolios
class PortfolioList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

# this gives details of each portfolio (there will be only 1)
class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

# This gives us all paintings in a portfolio
class PortfolioPaintingList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PortfolioPainting.objects.all()
    serializer_class = PortfolioPaintingSerializer

    def create(self, request, *args, **kwargs):
        logger.info("creating a portfolio painting")
        # Get the painting and gallery objects
        painting = Painting.objects.get(id=request.data.get('painting'))
        portfolio = Portfolio.objects.get(id=request.data.get('portfolio'))
        
        # Create the gallery painting
        portfolio_painting = PortfolioPainting.objects.create(
            paintings=painting,
            portfolio=portfolio,
            order=request.data.get('order', 0),
        )
        
        serializer = self.get_serializer(portfolio_painting)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# this gives us the specific details about paintings in the portfolio like order of painting
class PortfolioPaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PortfolioPainting.objects.all()
    serializer_class = PortfolioPaintingSerializer

# purchase order api stuff
class PurchaseOrderList(generics.ListCreateAPIView):
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer

class PurchaseOrderDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer


# more shizz with the stripe 
class StripeCheckout(APIView):
    permission_classes = [permissions.AllowAny]
    checkoutSerializer = CheckoutSerializer
    
    def post(self, request, *args, **kwargs):
        print(SECRET_STRIPE_KEY)
        serializer = self.checkoutSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        try:        
            print("validated data: " + str(serializer.validated_data['painting_ids']))
            line_items=[]
            painting_ids = []
            for painting in serializer.validated_data['painting_ids']:
                print("painting: " + str(painting))
                painting_ids.append(painting.id)
                checkoutPrice = stripe.Price.create(
                    currency="usd",
                    unit_amount=int(painting.price * 100),
                    product_data={ 
                        "name":painting.name, 
                        "active":not painting.sold
                        },
                    api_key= os.getenv("SECRET_STRIPE_KEY")
                )
                line_items.append({
                    'price': checkoutPrice.id,
                    'quantity': 1,
                })
            print(f"painting ids: {painting_ids}")
            checkoutSession = stripe.checkout.Session.create(
                ui_mode='embedded',
                line_items=line_items,
                mode='payment',
                return_url=os.getenv("BASE_URL") + "/return?session_id={CHECKOUT_SESSION_ID}",
                automatic_tax={'enabled':True},
                api_key= os.getenv("SECRET_STRIPE_KEY"),
                shipping_address_collection= { "allowed_countries": ["US"] },
                metadata={"ids":",".join(str(id) for id in painting_ids)},
                shipping_options=[
                    {"shipping_rate":SHIPPING_RATE_DICT["standard"]},
                    {"shipping_rate": SHIPPING_RATE_DICT["pickup"]}
                ]
            )

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"clientSecret": checkoutSession.client_secret})    


class StipeCheckoutSession(APIView):
    permission_classes = [permissions.AllowAny]
    checkoutStatusSerializer = CheckoutSessionSerializer

    def get(self, request, *args, **kwargs):
        statusSerializer = self.checkoutStatusSerializer(data=request.GET)

        if not statusSerializer.is_valid():
            return Response(statusSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        session = stripe.checkout.Session.retrieve(statusSerializer.validated_data['session_id'], api_key=os.getenv("STRIPE_SECRET_KEY"))
        logger.info(f"session status: {session.status}, customer email: {session.customer_details.email}")
        print(f"session status: {session.status}, customer email: {session.customer_details.email}")
        return Response({
            "status": session.status,
            "customer_email": session.customer_details.email
        })
    
class StripeShipping(APIView):
    permission_classes = [permissions.AllowAny]
    checkoutSessionSerializer = CheckoutSessionSerializer

    def post(self, request, *args, **kwargs):
        shippingSerializer = self.checkoutSessionSerializer(data=request.data.get("checkout_session_id"))
        shipping_details = request.data.get("shipping_details", {})
        address = shipping_details.get("address", {})
        city = address.get("city")
        zip_code = address.get("postal_code")

        if not shippingSerializer.is_valid():
            return Response(shippingSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if city != "San Antonio":
            return Response({
                "type": "error",
                "message": "Pickup is only available within San Antonio"
            },
            status=status.HTTP_400_BAD_REQUEST)

        session = stripe.checkout.Session.retrieve(shippingSerializer.validated_data['session_id'])

        return Response({"type": "success"})
    
class StripePaymentConfirmed(APIView):
    permission_classes = [permissions.AllowAny]
    pserial = PurchaseOrderSerializer

    def post(self, request, *args, **kwargs):
        po = self.pserial(data=request.body)
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        event = None

        try:
            if endpoint_secret:
                event = stripe.Webhook.construct_event(
                    payload, sig_header, endpoint_secret
                )
            else:
                event = json.loads(payload)
        except (ValueError, json.JSONDecodeError) as e:
            return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)

        if event['type'] == 'checkout.session.completed':
            # get the session data and then make a purchase order object
            session = event['data']['object']
            print(str(session))
            painting_ids = list(map(int, session['metadata']['ids'].split(',')))
            print(f"PRINTING {str(painting_ids)}")
            name = session['collected_information']['shipping_details']['name']
            address_data = session['collected_information']['shipping_details']['address']
            address = f"{address_data.get('line1', '')}" \
                f"{', ' + address_data['line2'] if address_data.get('line2') else ''}, " \
                f"{address_data.get('city', '')}, " \
                f"{address_data.get('state', '')} {address_data.get('postal_code', '')}, " \
                f"{address_data.get('country', '')}"
            shipping_method =  'SD' if SHIPPING_RATE_DICT['standard'] == session['shipping_cost']['shipping_rate'] else "PU"
            checkout_session_id = session['id']
            email = session['customer_details']['email']

            order = PurchaseOrder.objects.create(
                name=name,
                address=address,
                shipping_method=shipping_method,
                stripe_session_id=checkout_session_id,
                email=email,
            )

            order.paintings.set(Painting.objects.filter(id__in=painting_ids))
            
            # Update paintings BEFORE setting the relationship
            Painting.objects.filter(id__in=painting_ids).update(sold=True, forSale=False)
            message = Mail(
                    from_email='jaco.smith589@gmail.com',
                    to_emails='emersonsartgallery@gmail.com',
                    subject='Someone bought art',
                    html_content='<p>this is not a drill someone has bought art</p>'
                )
            try:
                send = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
                r = send.send(message)

            except Exception as e:
                print(f"Failed to send email cuz: {e}")

        return Response({'success': True}, status=status.HTTP_200_OK)
