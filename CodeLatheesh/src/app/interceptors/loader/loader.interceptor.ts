import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import { LoaderService } from '../../shared-services/loader/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
    const loaderService = inject(LoaderService);
 loaderService.show();

  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};
