from django.apps import AppConfig


class CooperativeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cooperative'
    def ready(self) -> None:
        import cooperative.signals.handler
