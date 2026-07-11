from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class UserOut(BaseModel):
    email: str
    role: str
