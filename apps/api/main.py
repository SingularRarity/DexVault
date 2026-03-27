from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers import listings, escrow


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="DexVault API",
    description="Trustless marketplace for GPU/CPU hardware",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(listings.router, prefix="/listings", tags=["listings"])
app.include_router(escrow.router, prefix="/escrow", tags=["escrow"])


@app.get("/health")
async def health():
    return {"status": "ok", "service": "dexvault-api"}
