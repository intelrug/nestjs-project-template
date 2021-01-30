import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  // eslint-disable-next-line class-methods-use-this,max-len,@typescript-eslint/no-unused-vars
  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string, referencedColumnNames?: string[]): string {
    const tableName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

    const name = columnNames.reduce(
      (n, column) => `${n}_${column}`,
      `${tableName}_${referencedTablePath}`,
    );

    return `fk_${name}`;
  }
}
