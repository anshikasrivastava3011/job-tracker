const Job = require('../models/Job');

const createJob = async (req, res) => {
  const { company, role, status } = req.body;

  try {
    const newJob = new Job({
      company,
      role,
      status,
      userId: req.user.userId 
    });

    await newJob.save();
    res.status(201).json({ message: 'Job added successfully', job: newJob });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job' });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findOne({ _id: id, userId: req.user.userId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, role, status } = req.body;

  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { company, role, status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job updated successfully', job: updatedJob });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update job' });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById, 
  updateJob,
  deleteJob
};
