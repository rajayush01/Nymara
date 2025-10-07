import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/jobs';

export interface Job {
  _id: string;
  title: string;
  company: string;
  department?: string;
  location: string;
  type?: string;
  salary?: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  isActive: boolean;
}

export interface JobInput {
  title: string;
  company: string;
  department?: string;
  location: string;
  type?: string;
  salary?: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  isActive: boolean;
}

export const getJobs = async (): Promise<Job[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addJob = async (job: JobInput): Promise<Job> => {
  const res = await axios.post(API_URL, job);
  return res.data;
};

export const updateJob = async (id: string, job: JobInput): Promise<Job> => {
  const res = await axios.put(`${API_URL}/${id}`, job);
  return res.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};