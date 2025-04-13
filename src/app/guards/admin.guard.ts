import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
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
  }

  return false;
};
