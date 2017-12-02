import { interfaces } from 'inversify-express-utils';

export class Principal implements interfaces.Principal {
  details: any;

  constructor(details) {
    this.details = details;
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }

  isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  isInRole(role: string): Promise<boolean> {
    const {roles: userRoles = []} = this.details || {};
    return Promise.resolve(!!userRoles.find(userRole => (role === userRole)));
  }
}
