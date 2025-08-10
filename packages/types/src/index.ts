import { z } from 'zod';

export const AttendanceMarkSchema = z.object({
  playerId: z.string().uuid(),
  teamId: z.string().uuid(),
  trainingDate: z.string(), // ISO date yyyy-mm-dd
  arrived: z.boolean(),
  note: z.string().max(500).optional()
});
export type AttendanceMark = z.infer<typeof AttendanceMarkSchema>;

export const RoutineSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  video_url: z.string().url().optional(),
  image_url: z.string().optional()
});
export type Routine = z.infer<typeof RoutineSchema>;

export const NotificationPayloadSchema = z.object({
  admin_id: z.string().uuid(),
  team_id: z.string().uuid().nullable(),
  message: z.string().min(1).max(500)
});
export type NotificationPayload = z.infer<typeof NotificationPayloadSchema>;

export const TeamSchema = z.object({ id: z.string().uuid(), name: z.string() });
export type Team = z.infer<typeof TeamSchema>;

// i18n exports
export * from './i18n';


