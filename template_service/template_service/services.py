import logging

from template_service.models import Template
from template_service.schemas import CreateTemplate
from template_service.utils import schema_to_dict

logger = logging.getLogger(__name__)


class TemplateService:
    @classmethod
    def create_template(cls, payload: CreateTemplate):
        payload_dict = schema_to_dict(payload)
        existing_template = (
            Template.objects.filter(
                name=payload.name,
                category=payload.category,
                language=payload.language,
                is_deleted=False,
            )
            .order_by("-version")
            .first()
        )
        if existing_template:
            payload_dict["version"] = existing_template.version + 1
        template = Template.objects.create(**payload_dict)
        logger.info(f"Template {template.name} created with ID: {template.id}")
        return template
