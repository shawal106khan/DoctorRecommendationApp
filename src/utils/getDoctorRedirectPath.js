export const getDoctorRedirectPath = (user) => {
  if (!user.isApproved) {
    return "/doctor/pending-approval";
  }

  if (!user.profileCompleted) {
    return "/doctor/complete-profile";
  }

  return "/doctor/dashboard";
};
