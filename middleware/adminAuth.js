import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const getAuthToken = (req) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (authHeader && authHeader.startsWith("Bearer ")) {
		return authHeader.slice(7).trim();
	}

	return req.headers["x-access-token"] || req.headers.token || null;
};

const getRequestedId = (req) => {
	return req.params?.id ?? req.body?.id ?? req.body?.adminId ?? req.query?.id ?? null;
};

const adminAuth = (req, res, next) => {
	try {
		const token = getAuthToken(req);

		if (!token) {
			return res.status(401).json({
				status: false,
				message: "Access token required",
			});
		}

		const secret = process.env.SECRET;
		if (!secret) {
			return res.status(500).json({
				status: false,
				message: "JWT secret not configured on server",
			});
		}

		const decoded = jwt.verify(token, secret);
		const adminId = decoded.AdminId ?? decoded.adminId ?? null;

		if (!adminId) {
			return res.status(403).json({
				status: false,
				message: "Admin access required",
			});
		}

		const requestedId = getRequestedId(req);

		if (requestedId !== null && String(requestedId) !== String(adminId)) {
			return res.status(403).json({
				status: false,
				message: "You are not allowed to access this admin resource",
			});
		}

		req.auth = {
			token,
			decoded,
			adminId,
			role: decoded.role || null,
			type: "admin",
			id: adminId,
		};

		req.adminId = adminId;

		return next();
	} catch (error) {
		return res.status(401).json({
			status: false,
			message: error.name === "TokenExpiredError" ? "Token expired" : "Invalid or expired token",
		});
	}
};

export default adminAuth;