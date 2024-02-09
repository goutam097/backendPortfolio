const AdminModel = require("../../models/admin.model");


exports.addEdit = async (req, res) => {
  try {
    const { id, name, email, password, description } = req.body.data;
    if (!id) {
      let CreateData = await AdminModel.create({
        name: name,
        email: email,
        password: password,
        description: description,
      });
      return res.status(201).send({
        data: {
          status: true,
          details: CreateData,
          message: "Sucessfully created",
        },
        errorNode: { errorCode: 0, errorMsg: "no error" },
      });
    } else {
      let updateData = await AdminModel.update(
        {
          name: name,
          email: email,
          password: password,
          description: description,
        },
        { where: { id: id } }
      );
      return res.status(201).send({
        data: {
          status: true,
          details: updateData,
          message: "Sucessfully updated",
        },
        errorNode: { errorCode: 0, errorMsg: "no error" },
      });
    }
  } catch (error) {}
};

exports.list = async (req, res) => {
  try {
    const dataItems = await AdminModel.findAll();
    if (dataItems) {
      return res.status(200).send({
        data: {
          sucess: true,
          details: dataItems,
        },
        errorNode: { errorCode: 0, errorMsg: "no error" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      data: {
        sucess: false,
        details: "Something went wrong!! please try again",
      },
      errorNode: { errorCode: 1, errorMsg: "error" },
    });
  }
};

exports.view = async (req, res) => {
  const id = req.body.data.id;
  try {
    const dataList = await AdminModel.findOne({ where: { id: id } });
    if (dataList) {
      return res.status(200).send({
        data: {
          success: true,
          details: dataList,
        },
        errorNode: { errorCode: 0, errorMsg: "no error" },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      data: {
        success: false,
        message: "Something went wrong!! please try again",
      },
      errorNode: { errorCode: 1, errorMsg: "error" },
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.data.id;
    await AdminModel.destroy({ where: { id: id } });

    return res.status(200).send({
      data: {
        success: true,
        message: "Succesfully Deleted",
      },
      errorNode: { errorCode: 0, errorMsg: "no error" },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      data: {
        success: false,
        message: "Something went wrong",
      },
      errorNode: { errorCode: 1, errorMsg: error },
    });
  }
};
