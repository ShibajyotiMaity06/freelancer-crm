import axiosInstance from "../config/axios";


export const getAllLeads = async () => {
    const response = await axiosInstance.get('leads')
    return response.data
}

export const createLead = async (leadData) => {
    const response = await axiosInstance.post('leads' , leadData)
    return response.data
}

export const updateLead = async (id , updatedData) => {
    const response = await axiosInstance.patch(`leads/${id}` , leadData)
    return response.data
}

export const deleteLead = async (id) => {
    const response = await axiosInstance.delete(`leads/${id}` , leadData)
    return response.data
}