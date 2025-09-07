import customerModel from "../models/customerModel.js";

// Create a new customer
export const createCustomer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const createdBy = req.user?._id; 
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'name, email, phone are required' });
        }
        const newCustomer = await customerModel.create({
            name,
            email,
            phone,
            createdBy,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        res.status(201).json({ message: "customer created successfully", newCustomer });
    } catch (error) {
        res.status(500).json({ message: "somethine went wrong", error: error.message });
    }
};

// Edit an existing customer
export const editCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const checkCustomer = await customerModel.findById(id);
        if (!checkCustomer) {
            return res.status(404).json({ message: "no customer found" });
        }
        const updateCustomer = await customerModel.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        res.status(200).json({ message: "updated customer successfully", updateCustomer });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "no customer found" });
        }
        const deleteCustomer = await customerModel.findByIdAndDelete(id);
        res.status(200).json({ message: "customer deleted successfully", deleteCustomer });
    } catch (error) {
        res.status(500).json({ message: "somthing went wrong ", error: error.message });
    }
};

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
   
    const customers = await customerModel.find({})
      .populate('createdBy', 'name ');
    res.status(200).json({ message: "fetched customers", customers });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
};


