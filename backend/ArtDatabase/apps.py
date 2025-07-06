from django.apps import AppConfig

class ArtdatabaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ArtDatabase'

    def ready(self):
        import ArtDatabase.signals