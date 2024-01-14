import Users from "../models/UserModel.js";

export const SetAddress = async (req, res) => {
  const { userId, address } = req.body;

  try {
    const verifyAddress = await Users.findOne({
      where: { address: req.body.address },
    });
    if (verifyAddress) {
      return res.status(400).json({ msg: "Address On System" });
    }
    if (address === "") {
      return res.status(400).json({ msg: "Type An Valid Address" });
    } else {
      await Users.update(
        {
          address: address,
        },
        {
          where: {
            id: userId,
          },
        },
      );
      return res.status(200).json({ msg: "Updated Success" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Operation Failed" });
  }
};
