import { z } from 'zod';

// Base brief item schema
const briefItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  tag: z.string(),
  date: z.string(),
  sourceIds: z.array(z.string()),
  related: z.object({
    countryIso2: z.string().nullable(),
    hubId: z.string().nullable(),
    corridorId: z.string().nullable()
  })
});

// Brief pack schema
const briefPackSchema = z.object({
  lens: z.string(),
  asOf: z.string(),
  globalSummary: z.string().optional(),
  items: z.array(briefItemSchema)
});

// Guided step schema
const guidedStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  prompt: z.string(),
  exampleRefs: z.array(z.object({
    type: z.string(),
    id: z.string()
  })),
  proofClaimIds: z.array(z.string()),
  difficulty: z.enum(['basic', 'intermediate', 'advanced'])
});

// Guided steps pack schema
const guidedStepsPackSchema = z.object({
  lens: z.string(),
  asOf: z.string(),
  steps: z.array(guidedStepSchema)
});

// Hub schema
const hubSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  countryIso2: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  type: z.string(),
  description: z.string(),
  validators: z.number(),
  projects: z.number()
});

// Corridor schema
const corridorSchema = z.object({
  id: z.string(),
  name: z.string(),
  from: z.union([z.string(), z.object({ countryIso2: z.string(), coordinates: z.tuple([z.number(), z.number()]) })]),
  to: z.union([z.string(), z.object({ countryIso2: z.string(), coordinates: z.tuple([z.number(), z.number()]) })]),
  type: z.string(),
  volume: z.enum(['high', 'medium', 'low']),
  description: z.string()
});

// Hubs data schema
const hubsDataSchema = z.object({
  hubs: z.array(hubSchema),
  corridors: z.array(corridorSchema)
});

// Source schema
const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  publisher: z.string(),
  url: z.string(),
  type: z.string(),
  reliability: z.enum(['high', 'medium', 'low'])
});

// Sources data schema
const sourcesDataSchema = z.object({
  sources: z.array(sourceSchema)
});

// Claim schema
const claimSchema = z.object({
  id: z.string(),
  claimType: z.string(),
  claim: z.string(),
  evidenceLevel: z.enum(['high', 'medium', 'low']),
  sourceIds: z.array(z.string()),
  jurisdiction: z.string().nullable(),
  limitations: z.array(z.string()),
  asOf: z.string()
});

// Claims data schema
const claimsDataSchema = z.object({
  claims: z.array(claimSchema),
  evidenceLevels: z.record(z.string(), z.string()),
  notClaiming: z.array(z.string())
});

// Schema map for different pack types
const schemaMap = {
  brief: briefPackSchema,
  guidedSteps: guidedStepsPackSchema,
  hubs: hubsDataSchema,
  sources: sourcesDataSchema,
  claims: claimsDataSchema
} as const;

type SchemaType = keyof typeof schemaMap;

/**
 * Load and validate a content pack with fallback
 */
export async function loadContentPack<T>(
  path: string,
  schemaType: SchemaType,
  fallback: T
): Promise<T> {
  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to load ${path}`);
    }
    
    const data = await response.json();
    const schema = schemaMap[schemaType];
    
    // Validate with zod
    const result = schema.safeParse(data);
    
    if (!result.success) {
      console.warn(`Validation failed for ${path}:`, result.error.issues);
      // Return data anyway but log warning - don't break the app
      return data as T;
    }
    
    return result.data as T;
  } catch (error) {
    console.error(`Failed to load content pack ${path}:`, error);
    return fallback;
  }
}

/**
 * Synchronous loader for static imports (used at build time)
 */
export function validateContentPack<T>(
  data: unknown,
  schemaType: SchemaType,
  fallback: T
): T {
  try {
    const schema = schemaMap[schemaType];
    const result = schema.safeParse(data);
    
    if (!result.success) {
      console.warn('Content pack validation warning:', result.error.issues);
      return data as T;
    }
    
    return result.data as T;
  } catch (error) {
    console.error('Content pack validation failed:', error);
    return fallback;
  }
}

// Default empty fallbacks
export const emptyBriefFallback = {
  lens: 'unknown',
  asOf: new Date().toISOString().split('T')[0],
  globalSummary: 'Data unavailable',
  items: []
};

export const emptyGuidedStepsFallback = {
  lens: 'unknown',
  asOf: new Date().toISOString().split('T')[0],
  steps: []
};

export const emptyHubsFallback = {
  hubs: [],
  corridors: []
};

export const emptySourcesFallback = {
  sources: []
};

export const emptyClaimsFallback = {
  claims: [],
  evidenceLevels: {},
  notClaiming: []
};
