"use strict";
import logger from "../../config/winston.js";
import authService from "../../services/auth/authService.js";
import tokenService from "../../services/token/tokenService.js";

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const rs = await authService.login(email, password);
      if (!rs.data) {
        return res.status(rs.status).json({ message: rs.message });
      }
      const accessToken = tokenService.generateToken(rs.data);
      res.status(rs.status).json({
        message: rs.message,
        data: { user: rs.data, accessToken: accessToken },
        status: rs.status,
      });
    } catch (error) {
      logger.error(error.message);
      res.status(error.status).json(error);
    }
  },
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const rs = await authService.register(email, password);
      res.status(rs.status).json(rs);
    } catch (error) {
      logger.error(error.message);
      res.status(error.status).json(error);
    }
  },
  getInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await authService.getInfo(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      logger.error(error.message);
      res.status(error.status).json(error);
    }
  },
  updateInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await authService.updateInfo(id, req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      logger.error(error.message);
      res.status(error.status).json(error);
    }
  },
  getMessage: async (req, res) => {
    try {
      const rs = await authService.getMessage();
      res.status(rs.status).json(rs);
    } catch (error) {
      logger.error(error.message);
      res.status(error.status).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const rs = await authService.getAll();
      res.status(rs.status).json(rs);
    } catch (error) {
      logger.error(error.message);
      res.status(error.status).json(error);
    }
  }
};

export default authController;
