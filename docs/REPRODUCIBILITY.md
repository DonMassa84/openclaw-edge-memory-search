# Reproduzierbarkeit

## Mindeststandard

    git clone <repo-url>
    cd <repo>
    make doctor
    make setup
    make test
    make agent-doctor

## Regeln

- keine lokalen Absolutpfade
- keine Secrets
- .env.example statt .env
- Tests über Makefile
