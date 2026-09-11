export const queryKeys = {
  balance: {
    all: ['balance'],

    /**
     * Saldo de um usuário em um período.
     * @param {string} userId - Identificador do usuário.
     * @param {string} from - Data inicial, no formato `yyyy-MM-dd`.
     * @param {string} to - Data final, no formato `yyyy-MM-dd`.
     * @returns {Array} Chave completa da query.
     */
    period: (userId, from, to) => [...queryKeys.balance.all, userId, from, to],
  },

  transactions: {
    all: ['transactions'],

    /**
     * Transações de um usuário em um período.
     * @param {string} userId - Identificador do usuário.
     * @param {string} from - Data inicial, no formato `yyyy-MM-dd`.
     * @param {string} to - Data final, no formato `yyyy-MM-dd`.
     * @returns {Array} Chave completa da query.
     */
    period: (userId, from, to) => [
      ...queryKeys.transactions.all,
      userId,
      from,
      to,
    ],
  },
};

export const mutationKeys = {
  login: ['login'],
  register: ['register'],
  createTransaction: ['create-transaction'],
};
