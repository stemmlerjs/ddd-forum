
async function runner (promises) {
  for (let command of promises) {
    try {
      await command();
    }

    catch (err) {

      if (err.original) {
        /**
         * This is an error that we can run into while seeding the same
         * data. It's passable.
         */

        if (err.original.code == "ER_DUP_ENTRY") {
          console.log(`>>> Passable error occurred: ER_DUP_ENTRY`)
        }

        /**
         * This is an error that we can run into where the same
         * field name already exists.
         */

        else if (err.original.code == "ER_DUP_FIELDNAME") {
          console.log(`>>> Passable error occurred: ER_DUP_FIELDNAME`)
        }

        /**
         * If the field doesn't exist and we're trying to drop it,
         * that's cool. We can pass this.
         */

        else if (err.original.code == "ER_CANT_DROP_FIELD_OR_KEY") {
          console.log(`>>> Passable error occurred: ER_CANT_DROP_FIELD_OR_KEY`)
        }

        else if (err.name == "SequelizeUnknownConstraintError") {
          console.log(`>>> Passable error. Trying to remove constraint that's already been removed.`)
        }

        /**
         * Any other error
         */

        else {
                console.log(err)
          throw new Error(err);
        }
      }

      else {
        console.log(err);
        throw new Error(err);
      }
    }
  }
}

export default {
  run: runner
}