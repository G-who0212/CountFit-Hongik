# Generated by Django 5.1.1 on 2024-09-24 12:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_rename_user_nickname_record_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='record',
            old_name='user_id',
            new_name='user',
        ),
    ]
