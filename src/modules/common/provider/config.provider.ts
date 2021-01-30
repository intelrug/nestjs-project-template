import * as Joi from 'joi';
import * as _ from 'lodash';

import { Service } from '../../tokens';
import { Config } from '../model';

export const configProvider = {

  provide: Service.CONFIG,
  useFactory: (): Config => {
    const { env } = process;
    const validationSchema = Joi.object().unknown().keys({
      NODE_ENV: Joi.string().required(),
      API_PORT: Joi.string().required(),
      API_PREFIX: Joi.string().required(),
      SWAGGER_ENABLE: Joi.string().required(),
      TYPEORM_HOST: Joi.string().required(),
      TYPEORM_PORT: Joi.string().required(),
      TYPEORM_USERNAME: Joi.string().required(),
      TYPEORM_PASSWORD: Joi.string().required(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_LOGGING: Joi.string().required(),
    });

    const result = validationSchema.validate(env);

    if (result.error) {
      throw new Error(`Configuration not valid: ${result.error.message}`);
    }

    return {
      NODE_ENV: `${env.NODE_ENV}`,
      API_PORT: _.toNumber(env.API_PORT),
      API_PREFIX: `${env.API_PREFIX}`,
      SWAGGER_ENABLE: _.toNumber(env.SWAGGER_ENABLE),
      TYPEORM_HOST: `${env.TYPEORM_HOST}`,
      TYPEORM_PORT: _.toNumber(env.TYPEORM_PORT),
      TYPEORM_USERNAME: `${env.TYPEORM_USERNAME}`,
      TYPEORM_PASSWORD: `${env.TYPEORM_PASSWORD}`,
      TYPEORM_DATABASE: `${env.TYPEORM_DATABASE}`,
      TYPEORM_LOGGING: env.TYPEORM_LOGGING === 'true',
    };
  },

};
