import { describe, it, expect } from 'vitest';
import { z } from 'zod';

import { NotificationPayloadSchema } from '@sagi-ball/types';

describe('NotificationPayloadSchema', () => {
  it('validates length <= 500', () => {
    expect(() => NotificationPayloadSchema.parse({ admin_id: crypto.randomUUID(), team_id: null, message: 'ok' })).not.toThrow();
    const long = 'a'.repeat(501);
    expect(() => NotificationPayloadSchema.parse({ admin_id: crypto.randomUUID(), team_id: null, message: long })).toThrow();
  });
});


