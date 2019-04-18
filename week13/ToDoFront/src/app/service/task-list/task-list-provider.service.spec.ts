import { TestBed } from '@angular/core/testing';

import { TaskListProviderService } from './task-list-provider.service';

describe('TaskListProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskListProviderService = TestBed.get(TaskListProviderService);
    expect(service).toBeTruthy();
  });
});