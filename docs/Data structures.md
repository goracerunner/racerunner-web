# Data Structures

### Users

```typescript
/**
 * COLLECTION: users
 */
interface User {
  uid: string;
  name: string;
  photoURL: string;
}

/**
 * SUBCOLLECTION: users/{uid}/protected
 */
interface UserDetails {
  uid: string;
  email: string;
  registered: timestamp;
}

/**
 * SUBCOLLECTION: users/{uid}/managedRaces
 * SUBCOLLECTION: users/{uid}/races
 *
 * These collections are populated automatically when the user is added to a race.
 */
interface RaceInfo {
  uid: string;
  name: string;
  description: string;
  eventDate: timestamp;
}
```

### Race

```typescript
/**
 * COLLECTION: races
 */
interface Race {
	uid: string;
  name: string;
  description: string;
  archived: boolean;
  owner: User;
  registrationCount: number;
  participantIds: string[]; 	// (auto)
  managerIds: string[]; 			// (auto)
  eventDate: timestamp;
  status: "registration_open" | "registration_closed" | "in_progress" | "closed" | "results";
}

/**
 * SUBCOLLECTION: races/{uid}/managers
 * SUBCOLLECTION: races/{uid}/participants
 * These collections should trigger auto updates to Race
 */
interface RaceUser {
	uid: string;
  name: string;
  photoURL: string;
}

/**
 * SUBCOLLECTION: races/{uid}/registrationFields
 */
interface RegistrationField {
  order: number;
	name: string;
  description: string;
  type: "text" | "longtext" | "number" | "list" | "listcustom" | "select" | "checkbox" | "markdown";
  required?: boolean;
  placeholder?: string;
  values?: string[];
  default?: string;
  prefilled?: string;
  validation?: {
    type: string;
    ... other paramters
  }
}

/**
 * SUBCOLLECTION: races/{uid}/registrations
 */
interface Registration extends RaceUser {
  [key: string]: string;
}

/**
 * SUBCOLLECTION: races/{uid}/nodes
 */
// TODO:

/**
 * SUBCOLLECTION: races/{uid}/teams
 */
// TODO:

```

### Logs

```typescript
/**
 * COLLECTION: logs
 */
interface Log {
  date: timestamp;
  source: "function" | "app-participant" | "app-manager" | "app-admin";
  level: "debug" | "info" | "warn" | "error";
  message: string;
  data: object;
}
```
