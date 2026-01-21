import apiMultipart from "../index/apiMultipart";
import api from "../index/api";

// Base admin service with shared functionality
class BaseAdminService {
  static BASE_PATH = "/users";
  static ADMIN_PATH = "/admins";

  static handleQueryParams(params = {}) {
    return params ? `?${new URLSearchParams(params).toString()}` : "";
  }
}

// Authentication Service
export class AuthService extends BaseAdminService {
  static async login(credentials) {
    return api("POST", `${this.BASE_PATH}/login`, credentials);
  }

  static async addPersonnel(data) {
    return api("POST", `${this.BASE_PATH}/human-resource/add-personnel`, data);
  }

  static async logout() {
    return api("POST", "/users/logout");
  }
}

// Dashboard Service
export class DashboardService extends BaseAdminService {
  static async getMainDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard`);
  }

  static async getSalesDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard/sales`);
  }

  static async getCustomerSupportDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard/custormer-support`);
  }

  static async getAccountManagerDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard/account-manager`);
  }

  static async getJPCOfficerDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard/jpc-officer`);
  }

  static async getHRDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard/human-resource`);
  }

  static async getJuniorFinanceLeadDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard/junior-finance-lead`);
  }

  static async getFinanceLeadDashboard() {
    return api("GET", `${this.BASE_PATH}/dashboard/finance-lead`);
  }
}

// User Management Service
export class UserService extends BaseAdminService {
  static async getUsers(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/users${this.handleQueryParams(params)}`
    );
  }

  static async getUserById(userId) {
    return api("GET", `${this.ADMIN_PATH}/users/${userId}`);
  }

  static async updateUser(userId, userData) {
    return api("PATCH", `${this.ADMIN_PATH}/users/${userId}`, userData);
  }

  // static async getPersonnel() {
  //   return api("GET", `${this.BASE_PATH}/human-resource/personnels`);
  // }

  static async addHRPersonnel(personnelData) {
    return api(
      "POST",
      `${this.ADMIN_PATH}/human-resource/add-personnel`,
      personnelData
    );
  }

  static async getHRPersonnels(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/human-resource/personnels${this.handleQueryParams(
        params
      )}`
    );
  }
}

// Complaints Service
export class ComplaintsService extends BaseAdminService {
  static async getAllComplaints(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/complaints${this.handleQueryParams(params)}`
    );
  }

  static async getWhatsappComplaints() {
    return api("GET", `${this.ADMIN_PATH}/complaints/whatsapp`);
  }

  static async getChatComplaints() {
    return api("GET", `${this.ADMIN_PATH}/complaints/chats`);
  }

  static async getEmailComplaints() {
    return api("GET", `${this.ADMIN_PATH}/complaints/emails`);
  }

  static async getComplaintById(complaintId) {
    return api("GET", `${this.ADMIN_PATH}/complaints/${complaintId}`);
  }

  static async updateComplaint(complaintId, data) {
    return api("PATCH", `${this.ADMIN_PATH}/complaints/${complaintId}`, data);
  }
}

// Subscription Service
export class SubscriptionService extends BaseAdminService {
  static async getSubscriptionPlans() {
    return api("GET", `${this.BASE_PATH}/subcriptions`);
  }

  static async createSubscriptionPlan(planData) {
    return api("POST", `${this.BASE_PATH}/subcriptions`, planData);
  }

  static async getSubscriptionPlanById(planId) {
    return api("GET", `${this.BASE_PATH}/subcriptions/${planId}`);
  }

  static async updateSubscriptionPlan(planId, planData) {
    return api("PATCH", `${this.BASE_PATH}/subcriptions/${planId}`, planData);
  }

  static async getSubscribers() {
    return api("GET", `${this.BASE_PATH}/subcribers`);
  }

  static async getSubscriberById(subscriberId) {
    return api("GET", `${this.BASE_PATH}/subcribers/${subscriberId}`);
  }

  static async updateSubscriber(subscriberId, data) {
    return api("PATCH", `${this.BASE_PATH}/subcribers/${subscriberId}`, data);
  }
}

// Financial Service
export class FinancialService extends BaseAdminService {
  static async getPayments(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/payments${this.handleQueryParams(params)}`
    );
  }

  static async updatePayments(data) {
    return api("PATCH", `${this.ADMIN_PATH}/payments`, data);
  }

  static async getPaymentById(paymentId) {
    return api("GET", `${this.ADMIN_PATH}/payments/${paymentId}`);
  }

  static async updatePaymentPlan(paymentId, data) {
    return api("PATCH", `${this.ADMIN_PATH}/payments/${paymentId}`, data);
  }

  static async deletePayment(paymentId) {
    return api("DELETE", `${this.ADMIN_PATH}/payments/${paymentId}`);
  }
  static async getRevenue() {
    return api("GET", `${this.ADMIN_PATH}/revenue`);
  }
}

// Transactions Service
export class TransactionService extends BaseAdminService {
  static async getTransactions(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/transactions${this.handleQueryParams(params)}`
    );
  }

  static async getTransactionById(transactionId) {
    return api("GET", `${this.ADMIN_PATH}/transactions/${transactionId}`);
  }

  static async updateTransaction(transactionId, data) {
    return api(
      "PATCH",
      `${this.ADMIN_PATH}/transactions/${transactionId}`,
      data
    );
  }

  static async getTransactionFees() {
    return api("GET", `${this.ADMIN_PATH}/transactions/fees`);
  }

  static async getTransactionFeeById(transactionId) {
    return api("GET", `${this.ADMIN_PATH}/transactions/fees/${transactionId}`);
  }

  static async updateTransactionFee(transactionId, data) {
    return api(
      "PATCH",
      `${this.ADMIN_PATH}/transactions/fees/${transactionId}`,
      data
    );
  }
}

// Salaries Service
export class SalaryService extends BaseAdminService {
  static async getSalaryTransactions() {
    return api("GET", `${this.BASE_PATH}/transactions/salaries`);
  }

  static async getSalaryTransactionById(salaryId) {
    return api("GET", `${this.BASE_PATH}/transactions/salaries/${salaryId}`);
  }

  static async updateSalaryTransaction(salaryId, data) {
    return api(
      "PATCH",
      `${this.BASE_PATH}/transactions/salaries/${salaryId}`,
      data
    );
  }

  static async getSalaries(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/salaries${this.handleQueryParams(params)}`
    );
  }

  static async createSalary(data) {
    return api("POST", `${this.ADMIN_PATH}/salaries`, data);
  }

  static async getRecentSalaries() {
    return api("GET", `${this.ADMIN_PATH}/salaries/recent`);
  }

  static async getSalaryStats() {
    return api("GET", `${this.ADMIN_PATH}/salaries/stats`);
  }

  static async getSalaryById(salaryId) {
    return api("GET", `${this.ADMIN_PATH}/salaries/${salaryId}`);
  }

  static async updateSalary(salaryId, data) {
    return api("PATCH", `${this.ADMIN_PATH}/salaries/${salaryId}`, data);
  }

  static async rejectSalaryPayment(salaryId, data) {
    return api("PATCH", `${this.ADMIN_PATH}/salaries/${salaryId}/reject`, data);
  }
}

// Content Management Service
export class ContentService extends BaseAdminService {
  static async getHomePageContent() {
    return api("GET", `${this.ADMIN_PATH}/contents/home-page`);
  }

  static async createHomePageContent(content) {
    return api("POST", `${this.ADMIN_PATH}/contents/home-page`, content);
  }

  static async getBlogs() {
    return api("GET", `${this.ADMIN_PATH}/blogs`);
  }

  static async createBlog(blogData) {
    return apiMultipart("POST", `${this.ADMIN_PATH}/blogs`, blogData);
  }

  static async getBlogById(blogId) {
    return api("GET", `${this.ADMIN_PATH}/blogs/${blogId}`);
  }

  static async updateBlog(blogId, blogData) {
    return api("PATCH", `${this.ADMIN_PATH}/blogs/${blogId}`, blogData);
  }
}

// School Management Service
export class SchoolService extends BaseAdminService {
  static async registerSchool(schoolData) {
    return api("POST", `${this.ADMIN_PATH}/schools/register`, schoolData);
  }
  static async addTeacher(teacherData) {
    return api("POST", `${this.ADMIN_PATH}/schools/add-teacher`, teacherData);
  }

  static async getSchools(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/schools${this.handleQueryParams(params)}`
    );
  }

  static async getSchoolById(schoolId) {
    return api("GET", `${this.ADMIN_PATH}/schools/${schoolId}`);
  }

  static async updateSchool(schoolId, schoolData) {
    return api("PATCH", `${this.ADMIN_PATH}/schools/${schoolId}`, schoolData);
  }

  static async getVerificationDocuments(schoolId) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/schools/verification-documents/${schoolId}`
    );
  }

  static async uploadVerificationDocuments(schoolId, documentsData) {
    return apiMultipart(
      "POST",
      `${this.ADMIN_PATH}/schools/verification-documents/${schoolId}`,
      documentsData
    );
  }

  static async getTeachers(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/teachers${this.handleQueryParams(params)}`
    );
  }

  static async getStudents(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/students${this.handleQueryParams(params)}`
    );
  }
}

// Book Management Service
export class BookService extends BaseAdminService {
  static async createBook(bookData) {
    return apiMultipart("POST", `${this.ADMIN_PATH}/books`, bookData);
  }

  static async getBooks(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/books${this.handleQueryParams(params)}`
    );
  }

  static async getBookById(bookId) {
    return api("GET", `${this.ADMIN_PATH}/books/${bookId}`);
  }

  static async updateBook(bookId, bookData) {
    // Assuming update might not always be multipart. If it is, change to apiMultipart
    return api("PATCH", `${this.ADMIN_PATH}/books/${bookId}`, bookData);
  }
}

// Job Management Service
export class JobService extends BaseAdminService {
  static async getJobs() {
    return api("GET", `${this.ADMIN_PATH}/jobs`);
  }

  static async createJob(jobData) {
    return api("POST", `${this.ADMIN_PATH}/jobs`, jobData);
  }

  static async getJobById(jobId) {
    return api("GET", `${this.ADMIN_PATH}/Jobs/${jobId}`);
  }

  static async updateJob(jobId, jobData) {
    return api("PATCH", `${this.ADMIN_PATH}/Jobs/${jobId}`, jobData);
  }

  static async getJobApplications() {
    return api("GET", `${this.ADMIN_PATH}/jobs/applications`);
  }

  static async getJobApplicationById(applicationId) {
    return api("GET", `${this.ADMIN_PATH}/Jobs/applications/${applicationId}`);
  }

  static async updateJobApplication(applicationId, data) {
    return api(
      "PATCH",
      `${this.ADMIN_PATH}/Jobs/applications/${applicationId}`,
      data
    );
  }

  static async deleteJobApplication(applicationId) {
    return api(
      "DELETE",
      `${this.ADMIN_PATH}/Jobs/applications/${applicationId}`
    );
  }
}

// Publisher Service
export class PublisherService extends BaseAdminService {
  static async getPublishers(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/publishers${this.handleQueryParams(params)}`
    );
  }

  static async getPublisherById(publisherId) {
    return api("GET", `${this.ADMIN_PATH}/publishers/${publisherId}`);
  }

  static async updatePublisher(publisherId, publisherData) {
    return api(
      "PATCH",
      `${this.ADMIN_PATH}/publishers/${publisherId}`,
      publisherData
    );
  }
}

// Earning Service
export class EarningService extends BaseAdminService {
  static async getEarnings(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/earnings${this.handleQueryParams(params)}`
    );
  }

  static async getEarningById(earningId) {
    return api("GET", `${this.ADMIN_PATH}/earnings/${earningId}`);
  }

  static async getVendorEarnings(params) {
    return api(
      "GET",
      `${this.ADMIN_PATH}/earnings/vendors${this.handleQueryParams(params)}`
    );
  }

  static async getVendorEarningById(earningId) {
    return api("GET", `${this.ADMIN_PATH}/earnings/vendors/${earningId}`);
  }
}

// Announcement Service
export class AnnouncementService extends BaseAdminService {
  static async createAnnouncement(announcement) {
    return api("POST", `${this.ADMIN_PATH}/announcements`, announcement);
  }

  static async getAnnouncement() {
    return api("GET", `${this.ADMIN_PATH}/announcements`);
  }
  static async getAnnouncementById(announcementId) {
    return api("GET", `${this.ADMIN_PATH}/announcements/${announcementId}`);
  }

  static async updateAnnouncement(announcementId, announcement) {
    return api(
      "PATCH",
      `${this.ADMIN_PATH}/announcements/${announcementId}`,
      announcement
    );
  }

  static async deleteAnnouncementById(announcementId) {
    return api("DELETE", `${this.ADMIN_PATH}/announcements/${announcementId}`);
  }
}
