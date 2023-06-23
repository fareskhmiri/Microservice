import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
/**
 * This is a workarround to resolve the problem of calling sequential multiple navigation
 *
 * https://nickkell.medium.com/sequential-router-navigation-in-angular-96d6a17049f7
 *
 */
@Injectable({
    providedIn: "root"
})
export class NavigationQueueService {
    private queue = Promise.resolve(true);

    constructor (private readonly router: Router) { }

    navigate(commands: any[], extras: NavigationExtras) {
        const enqueue = async () => {
            try {
                await this.queue;
            } catch (error) {
                console.error(error);
            }
            return await this.router.navigate(commands, extras);
        };
        this.queue = enqueue();
        return this.queue;
    }
}