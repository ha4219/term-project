# Generated by Django 3.0 on 2021-12-17 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('serving', models.DecimalField(decimal_places=10, max_digits=10)),
                ('carbohydrate', models.DecimalField(decimal_places=10, max_digits=10)),
                ('sugars', models.DecimalField(decimal_places=10, max_digits=10)),
                ('protein', models.DecimalField(decimal_places=10, max_digits=10)),
                ('province', models.DecimalField(decimal_places=10, max_digits=10)),
                ('saturated_fatty_acids', models.DecimalField(decimal_places=10, max_digits=10)),
                ('cholesterol', models.DecimalField(decimal_places=10, max_digits=10)),
                ('salt', models.DecimalField(decimal_places=10, max_digits=10)),
            ],
        ),
    ]