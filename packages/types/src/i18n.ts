export type Locale = 'he' | 'en';

export interface Translations {
  // Navigation
  nav: {
    dashboard: string;
    teams: string;
    players: string;
    coaches: string;
    routines: string;
    broadcast: string;
    attendance: string;
    audit: string;
    users: string;
  };

  // Page Headers
  pages: {
    dashboard: {
      title: string;
      subtitle: string;
    };
    teams: {
      title: string;
      subtitle: string;
    };
    players: {
      title: string;
      subtitle: string;
    };
    coaches: {
      title: string;
      subtitle: string;
    };
    routines: {
      title: string;
      subtitle: string;
    };
    notifications: {
      title: string;
      subtitle: string;
    };
    attendance: {
      title: string;
      subtitle: string;
    };
    audit: {
      title: string;
      subtitle: string;
    };
    users: {
      title: string;
      subtitle: string;
    };
  };

  // Common Actions
  actions: {
    create: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    apply: string;
    export: string;
    import: string;
    send: string;
    assign: string;
    remove: string;
    link: string;
    unlink: string;
  };

  // Forms
  forms: {
    team: {
      name: string;
      grade: string;
      trainingDay: string;
    };
    player: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      team: string;
    };
    routine: {
      title: string;
      description: string;
      videoUrl: string;
      image: string;
    };
    notification: {
      message: string;
      target: string;
      adminId: string;
    };
  };

  // Status
  status: {
    arrived: string;
    absent: string;
    active: string;
    inactive: string;
  };

  // Table Headers
  table: {
    date: string;
    player: string;
    status: string;
    note: string;
    loggedAt: string;
    name: string;
    team: string;
    role: string;
    createdAt: string;
    actions: string;
  };

  // Messages
  messages: {
    noData: string;
    loading: string;
    error: string;
    success: string;
    confirmDelete: string;
  };
}

export const hebrewTranslations: Translations = {
  nav: {
    dashboard: 'לוח בקרה',
    teams: 'קבוצות',
    players: 'שחקנים',
    coaches: 'מאמנים',
    routines: 'תרגילים',
    broadcast: 'הודעות',
    attendance: 'נוכחות',
    audit: 'ביקורת',
    users: 'משתמשים',
  },

  pages: {
    dashboard: {
      title: 'לוח בקרה - אקדמיית כדורגל',
      subtitle: 'עקוב אחר הקבוצות, השחקנים והתקדמות האימונים',
    },
    teams: {
      title: 'ניהול קבוצות',
      subtitle: 'צור ונהל את קבוצות אקדמיית הכדורגל',
    },
    players: {
      title: 'רשימת שחקנים',
      subtitle: 'נהל שחקנים וקשרים להורים',
    },
    coaches: {
      title: 'הקצאת מאמנים',
      subtitle: 'הקצה מאמנים לקבוצות ספציפיות',
    },
    routines: {
      title: 'ספריית אימונים',
      subtitle: 'נהל והקצה תרגילי אימון לקבוצות',
    },
    notifications: {
      title: 'הודעות מועדון',
      subtitle: 'שלח הודעות חשובות להורים ומאמנים',
    },
    attendance: {
      title: 'נוכחות משחק',
      subtitle: 'סנן וייצא רשומות נוכחות',
    },
    audit: {
      title: 'יומן ביקורת',
      subtitle: 'סקור את כל פעולות המערכת ושינויים',
    },
    users: {
      title: 'ניהול משתמשים',
      subtitle: 'צפה ועדכן תפקידי משתמשים',
    },
  },

  actions: {
    create: 'צור',
    edit: 'ערוך',
    delete: 'מחק',
    save: 'שמור',
    cancel: 'ביטול',
    apply: 'החל',
    export: 'ייצא',
    import: 'ייבא',
    send: 'שלח',
    assign: 'הקצה',
    remove: 'הסר',
    link: 'קשר',
    unlink: 'נתק',
  },

  forms: {
    team: {
      name: 'שם קבוצה',
      grade: 'כיתה',
      trainingDay: 'יום אימון',
    },
    player: {
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      dateOfBirth: 'תאריך לידה',
      team: 'קבוצה',
    },
    routine: {
      title: 'כותרת תרגיל',
      description: 'תיאור',
      videoUrl: 'כתובת וידאו',
      image: 'תמונה',
    },
    notification: {
      message: 'הודעה',
      target: 'יעד',
      adminId: 'מזהה מנהל',
    },
  },

  status: {
    arrived: 'הגיע',
    absent: 'נעדר',
    active: 'פעיל',
    inactive: 'לא פעיל',
  },

  table: {
    date: 'תאריך',
    player: 'שחקן',
    status: 'סטטוס',
    note: 'הערה',
    loggedAt: 'נרשם ב',
    name: 'שם',
    team: 'קבוצה',
    role: 'תפקיד',
    createdAt: 'נוצר ב',
    actions: 'פעולות',
  },

  messages: {
    noData: 'אין נתונים',
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    confirmDelete: 'האם אתה בטוח שברצונך למחוק?',
  },
};

export const englishTranslations: Translations = {
  nav: {
    dashboard: 'Dashboard',
    teams: 'Teams',
    players: 'Players',
    coaches: 'Coaches',
    routines: 'Routines',
    broadcast: 'Broadcast',
    attendance: 'Attendance',
    audit: 'Audit',
    users: 'Users',
  },

  pages: {
    dashboard: {
      title: 'Football Academy Dashboard',
      subtitle: 'Track your teams, players, and training progress',
    },
    teams: {
      title: 'Teams Management',
      subtitle: 'Create and manage your football academy teams',
    },
    players: {
      title: 'Player Roster',
      subtitle: 'Manage players and their parent links',
    },
    coaches: {
      title: 'Coach Assignments',
      subtitle: 'Assign coaches to specific teams',
    },
    routines: {
      title: 'Training Library',
      subtitle: 'Manage and assign training routines to teams',
    },
    notifications: {
      title: 'Club Broadcast',
      subtitle: 'Send important announcements to parents and coaches',
    },
    attendance: {
      title: 'Matchday Attendance',
      subtitle: 'Filter and export attendance logs',
    },
    audit: {
      title: 'Audit Trail',
      subtitle: 'Review all system actions and changes',
    },
    users: {
      title: 'User Management',
      subtitle: 'View and update user roles',
    },
  },

  actions: {
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    apply: 'Apply',
    export: 'Export',
    import: 'Import',
    send: 'Send',
    assign: 'Assign',
    remove: 'Remove',
    link: 'Link',
    unlink: 'Unlink',
  },

  forms: {
    team: {
      name: 'Team name',
      grade: 'Grade level',
      trainingDay: 'Training day',
    },
    player: {
      firstName: 'First name',
      lastName: 'Last name',
      dateOfBirth: 'Date of birth',
      team: 'Team',
    },
    routine: {
      title: 'Routine title',
      description: 'Description',
      videoUrl: 'Video URL',
      image: 'Image',
    },
    notification: {
      message: 'Message',
      target: 'Target',
      adminId: 'Admin ID',
    },
  },

  status: {
    arrived: 'Arrived',
    absent: 'Absent',
    active: 'Active',
    inactive: 'Inactive',
  },

  table: {
    date: 'Date',
    player: 'Player',
    status: 'Status',
    note: 'Note',
    loggedAt: 'Logged at',
    name: 'Name',
    team: 'Team',
    role: 'Role',
    createdAt: 'Created at',
    actions: 'Actions',
  },

  messages: {
    noData: 'No data',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    confirmDelete: 'Are you sure you want to delete?',
  },
};

export const translations: Record<Locale, Translations> = {
  he: hebrewTranslations,
  en: englishTranslations,
};
