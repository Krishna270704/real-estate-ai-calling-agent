from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.database import Base


class Lead(Base):

    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    phone = Column(String)

    buy_or_invest = Column(String)

    location = Column(String)

    property_type = Column(String)

    configuration = Column(String)

    budget = Column(String)

    purpose = Column(String)

    timeline = Column(String)

    summary = Column(String)