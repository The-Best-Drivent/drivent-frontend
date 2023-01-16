FROM node:14

WORKDIR /app

COPY ./package*.json ./

COPY ./.husky ./

ENV REACT_APP_API_BASE_URL="http://localhost:4000"
ENV REACT_APP_GITHUB_CLIENT_ID=27af4af81415ab42b9f4
ENV REACT_APP_GITHUB_CLIENT_SECRET=ec4a0ae8f54f8c327e51d6052077244c47d16d6a

RUN npm i

COPY . .

CMD ["npm", "run", "start"]