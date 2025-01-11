import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = sessionStorage.getItem("authToken");
  const role = sessionStorage.getItem("role");
  
  if(token != null && role == "Admin")
  {
    return true;
  }
  else
  {
    router.navigate(['/signin']);
    return false;
  }
};
