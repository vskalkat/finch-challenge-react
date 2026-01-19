export const DEFAULT_TASK_TYPES = {
    INTAKE_CALL: "intake_call",
    SIGN_ENGAGEMENT_LETTER: "sign_engagement_letter",
    COLLECT_MEDICAL_RECORDS: "collect_medical_records",
    CLIENT_CHECK_IN: "client_check_in",
    CREATE_DEMAND: "create_demand",
}

export interface TaskDepsI {
    task_name: string;
    time_passed: number;
}

export type TaskI = Record<string, TaskDepsI[]>;

export const DEFAULT_TASKS_CONFIG: TaskI = {
  [DEFAULT_TASK_TYPES.INTAKE_CALL]: [],
  [DEFAULT_TASK_TYPES.SIGN_ENGAGEMENT_LETTER]: [
    { task_name: DEFAULT_TASK_TYPES.INTAKE_CALL, time_passed: 0 }
  ],
  [DEFAULT_TASK_TYPES.COLLECT_MEDICAL_RECORDS]: [
    { task_name: DEFAULT_TASK_TYPES.SIGN_ENGAGEMENT_LETTER, time_passed: 0 }
  ],
  [DEFAULT_TASK_TYPES.CLIENT_CHECK_IN]: [
    { task_name: DEFAULT_TASK_TYPES.SIGN_ENGAGEMENT_LETTER, time_passed: 0 },
    { task_name: DEFAULT_TASK_TYPES.INTAKE_CALL, time_passed: 2 * 7 * 24 * 60 * 60 * 1000 }
  ],
  [DEFAULT_TASK_TYPES.CREATE_DEMAND]: [
    { task_name: DEFAULT_TASK_TYPES.COLLECT_MEDICAL_RECORDS, time_passed: 0 },
  ]
};