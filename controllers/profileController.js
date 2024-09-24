import prisma from "../DB/db.config.js";
import { generateRandomNo, imageValidator } from "../utils/helper.js";

class profileController {
  static async index(req, res) {
    try {
      const user = req.user;
      return res.json({ status: 200, user });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async store() {}

  static async show() {}

  static async update(req, res) {
    try {
      const { id } = req.params;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .json({ status: 400, message: "profile img is required" });
      }

      const profile = req.files.profile;
      const message = imageValidator(profile?.size, profile.mimetype);
      if (message !== null) {
        return res.status(400).json({
          errors: {
            profile: message,
          },
        });
      }

      const imgExt = profile?.name.split(".");
      const imageName = generateRandomNo() + "." + imgExt[1];
      const ulpoadPath = process.cwd() + "/public/images/" + imageName;

      profile.mv(ulpoadPath, (err) => {
        if (err) throw err;
      });

      await prisma.users.update({
        data: {
          profile: imageName,
        },
        where: {
          id: Number(id),
        },
      });

      return res.json({
        status: 200,
        message: "Profile updated successfully!",
      });
    } catch (error) {
      console.log("The error is", error);
      return res.status(500).json({
        message: "Somthing went wrong",
      });
    }
  }

  static async destroy() {}
}

export default profileController;
