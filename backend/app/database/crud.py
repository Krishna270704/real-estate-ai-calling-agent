from app.database.database import SessionLocal
from app.database.models import Lead


def save_lead(data,summary):

    db = SessionLocal()

    lead = Lead(

        name=data.get("name",""),

        phone=data.get("phone",""),

        buy_or_invest=data.get("buy_or_invest",""),

        location=data.get("location",""),

        property_type=data.get("property_type",""),

        configuration=data.get("configuration",""),

        budget=data.get("budget",""),

        purpose=data.get("purpose",""),

        timeline=data.get("timeline",""),

        summary=summary

    )

    db.add(lead)

    db.commit()

    db.refresh(lead)

    db.close()

    return lead

def get_all_leads():

    db = SessionLocal()

    leads = db.query(Lead).all()

    db.close()

    return leads

def delete_all_leads():

    db = SessionLocal()

    db.query(Lead).delete()

    db.commit()

    db.close()

    return {
        "message": "All leads deleted successfully."
    }