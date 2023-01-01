# SPDX-FileCopyrightText: 2023 Samir Romdhani <samir.romdhani1994@gmail.com>
##
# SPDX-License-Identifier: MIT license

FROM node

RUN mkdir -p /backend
WORKDIR /backend
COPY ./ ./

RUN npm install
ENTRYPOINT ["npm"]
CMD ["run", "start:dev"]

EXPOSE 3000