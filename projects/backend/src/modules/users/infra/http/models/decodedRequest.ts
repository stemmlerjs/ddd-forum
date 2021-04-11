
import express from 'express';
import { JWTClaims } from "../../../domain/jwt";

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims
}