export const getDoctorRedirectPath = (user) => {
  if (!user.isApproved) {
    return "/doctor/pending-approval";
  }

  if (!(user.profile_completed ?? user.profileCompleted)) {
    return "/doctor/complete-profile";
  }

  return "/doctor/dashboard";
};
