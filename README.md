# village-backend

## Introduction

This spells out project guidelines to ease project on-boarding and setup.

Available features include:

- Appeals
- Donations


#### Setup

1. git clone the project from the main branch
2. git checkout to the develop branch
3. create a new branch from develop branch and follow naming [conventions](https://doc.clickup.com/7242399/d/h/6x0mz-380/29b0708c3b89cda/6x0mz-80)
4. create a .env file mirroring values from the .example.env file in the root directory of the project
5. then run the below command in the root directory of the project.

```bash
npm install && npm run dev
```

#### Tests
 
Working with jest and supertest for the test suite, to view the test reports run the following commands below in the root directory of the project.

```bash
npm install mongodb-memory-server
```

Note that this will take some time. Then run the below command

```bash
npm test
```



#### ```Note```

1. Eslint is been used to enforce code styling and formatting for standardisation purposes 
2. Please refer to the following resources to clear any confusions and to configure lint-on-save with vs-code


1. [Eslint configuration](https://dev.to/drsimplegraffiti/eslint-configuration-for-node-project-275l)
2. [Linting on save](https://www.digitalocean.com/community/tutorials/workflow-auto-eslinting)


#### Usage

[Documentation](https://documenter.getpostman.com/view/14326360/2s8YmLu2v2)

**1**. **Appeals**

  * Create appeal
  * Get all appeals(particular user)
  * Get one appeal
  * Update appeal
  * Delete appeal
  * List of appeals
  * Comment on an appeal
  * Like an appeal

**2**. **Donations**

 * Verify payments