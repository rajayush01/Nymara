import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

// Backend expects these field names
export interface ApplicationData {
  applicantName: string;
  email: string;
  phone: string;
  resumeLink: string;
  coverLetter: string;
}

// Define the API response type from your backend
export interface ApplyJobResponse {
  message: string;
  application: {
    _id: string;
    job: string;
    applicantName: string;
    email: string;
    phone: string;
    resumeLink: string;
    coverLetter: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Application {
  _id: string;
  job: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeLink: string;
  coverLetter: string;
  status: 'applied' | 'reviewing' | 'rejected' | 'accepted';
  createdAt: string;
  updatedAt: string;
}

export const applyJob = async (
  jobId: string,
  applicationData: ApplicationData
): Promise<ApplyJobResponse> => {
  try {
    const res = await axios.post<ApplyJobResponse>(
      `${API_BASE}/api/applications/${jobId}/apply`,
      applicationData
    );
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("applyJob API error:", err.response?.data);
      throw err.response?.data || err;
    }
    throw err;
  }
};

export const getApplications = async (): Promise<Application[]> => {
  const res = await axios.get(`${API_BASE}/api/applications`);
  return res.data;
};

export const getApplicationsByJob = async (jobId: string): Promise<Application[]> => {
  try {
    const res = await axios.get(`${API_BASE}/api/applications/${jobId}/applications`);
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("getApplicationsByJob API error:", err.response?.data);
      throw err.response?.data || err;
    }
    throw err;
  }
};