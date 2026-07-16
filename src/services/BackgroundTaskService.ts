import BackgroundService from 'react-native-background-actions';

class BackgroundTaskService {

  private isRunning = false;

  private options = {
    taskName: 'EmployeeTracking',
    taskTitle: 'Employee Tracking',
    taskDesc: 'Tracking your location...',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#2563EB',
    parameters: {},
  };

  /**
   * Background Task
   */
  private trackingTask = async (
    taskData: any,
  ) => {
    while (BackgroundService.isRunning()) {

      // Background work here
      console.log('Tracking Running...');

      await new Promise(resolve =>
        setTimeout(resolve, 10000),
      );
    }
  };

  /**
   * Start
   */
  async start() {

    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    await BackgroundService.start(
      this.trackingTask,
      this.options,
    );
  }

  /**
   * Stop
   */
  async stop() {

    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;

    await BackgroundService.stop();
  }

  /**
   * Status
   */
  isBackgroundRunning() {
    return this.isRunning;
  }
}

export default new BackgroundTaskService();