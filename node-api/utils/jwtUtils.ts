import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // เปลี่ยนเป็นคีย์ลับของคุณ

// สร้าง Token
export function generateToken(userId: string): string {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
}

// ตรวจสอบและถอด Token
export function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId as string;
  } catch (error) {
    return null;
  }
}

