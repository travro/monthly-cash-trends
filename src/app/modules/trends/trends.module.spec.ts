import { TrendsModule } from './trends.module';

describe('TrendsModule', () => {
  let trendsModule: TrendsModule;

  beforeEach(() => {
    trendsModule = new TrendsModule();
  });

  it('should create an instance', () => {
    expect(trendsModule).toBeTruthy();
  });
});
