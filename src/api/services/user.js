import { protectedApi, publicApi } from '@/lib/axios';

/**
 * @typedef {Object} User
 * @property {string} id - Identificador do usuário.
 * @property {string} firstName - Primeiro nome.
 * @property {string} lastName - Sobrenome.
 * @property {string} email - E-mail.
 */

/**
 * Usuário no formato cru da API, em snake_case.
 * @typedef {Object} ApiUser
 * @property {string} id - Identificador do usuário.
 * @property {string} first_name - Primeiro nome.
 * @property {string} last_name - Sobrenome.
 * @property {string} email - E-mail.
 */

/**
 * @typedef {Object} Tokens
 * @property {string} accessToken - Token de acesso, de vida curta.
 * @property {string} refreshToken - Token usado para renovar o de acesso.
 */

/**
 * Resumo financeiro de um período. Os totais vêm como string para preservar a
 * precisão decimal que o backend usa nos valores monetários.
 * @typedef {Object} Balance
 * @property {string} earnings - Total de ganhos.
 * @property {string} expenses - Total de despesas.
 * @property {string} investments - Total investido.
 * @property {number} earningsPercentage - Percentual de ganhos.
 * @property {number} expensesPercentage - Percentual de despesas.
 * @property {number} investmentsPercentage - Percentual de investimentos.
 * @property {string} balance - Saldo do período.
 */

/**
 * @typedef {Object} AuthResult
 * @property {User} user - Usuário autenticado.
 * @property {Tokens} tokens - Tokens da sessão.
 */

/**
 * Converte o usuário da API para o formato usado na aplicação, descartando
 * os campos não utilizados (incluindo o hash da senha).
 * @param {ApiUser} user - Usuário como vem da API.
 * @returns {User} Usuário em camelCase.
 */
const mapUser = (user) => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
});

export const UserService = {
  /**
   * Cria um novo usuário e já inicia uma sessão para ele.
   * @param {Object} input - Dados do novo usuário.
   * @param {string} input.firstName - Primeiro nome.
   * @param {string} input.lastName - Sobrenome.
   * @param {string} input.email - E-mail.
   * @param {string} input.password - Senha, com no mínimo 6 caracteres.
   * @returns {Promise<AuthResult>} Usuário criado e tokens da sessão.
   * @throws {import('axios').AxiosError} Se a API rejeitar os dados, por
   * exemplo quando o e-mail já está cadastrado.
   */
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

  /**
   * Autentica um usuário existente.
   * @param {Object} input - Credenciais de acesso.
   * @param {string} input.email - E-mail.
   * @param {string} input.password - Senha.
   * @returns {Promise<AuthResult>} Usuário autenticado e tokens da sessão.
   * @throws {import('axios').AxiosError} Se as credenciais forem inválidas.
   */
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

  /**
   * Busca o usuário da sessão atual. O token é anexado pelo interceptor do
   * `protectedApi`, que também tenta renová-lo em caso de 401.
   * @returns {Promise<User>} Usuário da sessão.
   * @throws {import('axios').AxiosError} Se não houver sessão válida.
   */
  getMe: async () => {
    const response = await protectedApi.get('/users/me');

    return mapUser(response.data);
  },

  /**
   * Busca o resumo financeiro da sessão atual dentro de um período.
   * @param {Object} input - Período consultado.
   * @param {string} input.from - Data inicial, no formato `yyyy-MM-dd`.
   * @param {string} input.to - Data final, no formato `yyyy-MM-dd`.
   * @returns {Promise<Balance>} Totais e percentuais do período.
   * @throws {import('axios').AxiosError} Se não houver sessão válida ou se as
   * datas estiverem ausentes ou malformadas.
   */
  getBalance: async (input) => {
    const queryParams = new URLSearchParams();
    queryParams.set('from', input.from);
    queryParams.set('to', input.to);

    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    );

    return response.data;
  },
};
