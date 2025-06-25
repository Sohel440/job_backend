import {Application} from "../models/Application.js"
import { Job } from "../models/JobModel.js";

export const ApplyJob = async (req , res )=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
    
        if(!jobId){
            return res.status(400).json({ 
                message:"Job id is required.",
                success : false
            });
        }


        const existingApplication = await Application.findOne({job:jobId , applicant : userId});

        if(existingApplication){
            return res.status(400).json({
                message: "You already allpied.",
                success:false
            });
        }

        const job  = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job is not found",
                success: false
            })
        }

        // create 

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        }) ;

        job.applications.push(newApplication._id);

        await job.save();
        
        return res.status(201).json({
            message:"Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        
    }
}



export const getApplliedJobs = async (req , res )=>{
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path: "job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        });



        if(!application){
            return res.status(404).json({
                message:"No Application.",
                success: false
            });
        }

        return res.status(201).json({
            application,
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
}

// admin dekbe koto jon apply korlo
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}



// update 

export const updateStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const applicationId = req.params.id;
  
      if (!status) {
        return res.status(400).json({
          message: "Status is required.",
          success: false,
        });
      }
  
      const validStatuses = ["pending", "accepted", "rejected"];
      const newStatus = status.toLowerCase();
  
      if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({
          message: `Invalid status. Valid options: ${validStatuses.join(", ")}`,
          success: false,
        });
      }
  
      const application = await Application.findById(applicationId);
  
      if (!application) {
        return res.status(404).json({
          message: "Application not found.",
          success: false,
        });
      }
  
      application.status = newStatus;
      await application.save();
  
      return res.status(200).json({
        message: "Status updated successfully.",
        success: true,
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error.",
        success: false,
      });
    }
  };
  