# ------------ STAGE 1: INSTALL DEPENDENCIES ------------
FROM node:20-alpine AS deps

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./

# Remove nodemon from production (dev dependency)
RUN npm install --only=production

# ------------ STAGE 2: RUNTIME IMAGE ------------
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy app dependencies
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy all source files (including index.js)
COPY . .

# Create non-root user for best security practice
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

# Default port your app listens on
ENV PORT=8080

EXPOSE 8080

# Run using Node (NOT nodemon) in production
CMD ["node", "index.js"]
