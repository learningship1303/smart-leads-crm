import Lead from "../models/Lead";

// ========================================
// GET ALL LEADS
// ========================================
export const getLeads = async (
  req: any,
  res: any
) => {

  try {

    // PAGINATION
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 6;

    const skip =
      (page - 1) * limit;

    // SORTING
    const sortOrder =
      req.query.sort === "oldest"
        ? 1
        : -1;

    // SEARCH
    const search =
      req.query.search || "";

    // FILTER
    const status =
      req.query.status || "";

    // QUERY
    const query: any = {

      // ADMIN CAN SEE ALL
      ...(req.user.role !== "admin" && {
        createdBy: req.user._id,
      }),

      // SEARCH
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    // STATUS FILTER
    if (
      status &&
      status !== "All"
    ) {

      query.status = status;

    }

    // FETCH LEADS
    const leads =
      await Lead.find(query)
        .sort({
          createdAt: sortOrder,
        })
        .skip(skip)
        .limit(limit);

    // TOTAL LEADS
    const total =
      await Lead.countDocuments(
        query
      );

    res.status(200).json({
      total,
      currentPage: page,
      totalPages: Math.ceil(
        total / limit
      ),
      leads,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ========================================
// CREATE LEAD
// ========================================
export const createLead = async (
  req: any,
  res: any
) => {

  try {

    const {
      name,
      email,
      company,
      status,
      source,
    } = req.body;

    // VALIDATION
    if (
      !name ||
      !email ||
      !company
    ) {

      return res.status(400).json({
        message:
          "Please fill all fields",
      });

    }

    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      return res.status(400).json({
        message:
          "Please enter valid email",
      });

    }

    // CHECK EXISTING EMAIL
    const existingLead =
      await Lead.findOne({
        email,
        createdBy:
          req.user._id,
      });

    if (existingLead) {

      return res.status(400).json({
        message:
          "Lead already exists",
      });

    }

    // CREATE LEAD
    const lead =
      await Lead.create({

        name,
        email,
        company,
        status,
        source,

        // OWNER
        createdBy:
          req.user._id,

      });

    res.status(201).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ========================================
// DELETE LEAD
// ========================================
export const deleteLead = async (
  req: any,
  res: any
) => {

  try {

    // FIND LEAD
    const lead =
      await Lead.findById(
        req.params.id
      );

    if (!lead) {

      return res.status(404).json({
        message:
          "Lead not found",
      });

    }

    // DELETE
    await Lead.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Lead deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ========================================
// UPDATE LEAD
// ========================================
export const updateLead = async (
  req: any,
  res: any
) => {

  try {

    const {
      name,
      email,
      company,
      status,
      source,
    } = req.body;

    // VALIDATION
    if (
      !name ||
      !email ||
      !company
    ) {

      return res.status(400).json({
        message:
          "Please fill all fields",
      });

    }

    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      return res.status(400).json({
        message:
          "Please enter valid email",
      });

    }

    // FIND LEAD
    const lead =
      await Lead.findById(
        req.params.id
      );

    if (!lead) {

      return res.status(404).json({
        message:
          "Lead not found",
      });

    }

    // SECURITY CHECK
    if (

      req.user.role !== "admin" &&

      lead.createdBy?.toString() !==
        req.user._id.toString()

    ) {

      return res.status(403).json({
        message:
          "Unauthorized",
      });

    }

    // CHECK DUPLICATE EMAIL
    const existingLead =
      await Lead.findOne({

        email,

        _id: {
          $ne: req.params.id,
        },

        createdBy:
          req.user._id,

      });

    if (existingLead) {

      return res.status(400).json({
        message:
          "Another lead with this email already exists",
      });

    }

    // UPDATE LEAD
    const updatedLead =
      await Lead.findByIdAndUpdate(

        req.params.id,

        {
          name,
          email,
          company,
          status,
          source,
        },

        {
          new: true,
          runValidators: true,
        }

      );

    res.status(200).json(
      updatedLead
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};