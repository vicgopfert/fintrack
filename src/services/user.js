import { protectedApi, publicApi } from '@/lib/axios';

const mapUser = (user) => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
});

export const UserService = {
  register: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });

    return {
      user: mapUser(response.data.user),
      tokens: response.data.tokens,
    };
  },

  login: async (input) => {
    const response = await publicApi.post('/auth/login', {
      email: input.email,
      password: input.password,
    });

    return {
      user: mapUser(response.data.user),
      tokens: response.data.tokens,
    };
  },

  getMe: async () => {
    const response = await protectedApi.get('/users/me');

    return mapUser(response.data);
  },
};
