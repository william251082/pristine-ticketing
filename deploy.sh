#!/usr/bin/env bash
docker build -t iceshop/auth:latest -t iceshop/auth:$SHA -f ./auth/Dockerfile ./auth
docker build -t iceshop/client:latest -t iceshop/client:$SHA -f ./client/Dockerfile ./client
docker build -t iceshop/expiration:latest -t iceshop/expiration:$SHA -f ./expiration/Dockerfile ./expiration
docker build -t iceshop/event-bus:latest -t iceshop/event-bus:$SHA -f ./event-bus/Dockerfile ./event-bus
docker build -t iceshop/payments:latest -t iceshop/payments:$SHA -f ./payments/Dockerfile ./payments
docker build -t iceshop/tickets:latest -t iceshop/tickets:$SHA -f ./tickets/Dockerfile ./tickets
docker build -t iceshop/orders:latest -t iceshop/orders:$SHA -f ./orders/Dockerfile ./orders

docker push iceshop/auth:latest
docker push iceshop/client:latest
docker push iceshop/expiration:latest
docker push iceshop/event-bus:latest
docker push iceshop/payments:latest
docker push iceshop/tickets:latest
docker push iceshop/orders:latest

docker push iceshop/auth:$SHA
docker push iceshop/client:$SHA
docker push iceshop/expiration:$SHA
docker push iceshop/event-bus:$SHA
docker push iceshop/payments:$SHA
docker push iceshop/tickets:$SHA
docker push iceshop/orders:$SHA

kubectl apply -f infra/k8s
kubectl set image deployments/auth-depl auth=iceshop/auth:$SHA
kubectl set image deployments/auth-mongo-depl auth-mongo=mongo:$SHA
kubectl set image deployments/client-depl client=iceshop/client:$SHA
kubectl set image deployments/expiration-depl expiration=iceshop/expiration:$SHA
kubectl set image deployments/expiration-redis-depl expiration-redis=redis:$SHA
kubectl set image deployments/nats-depl nats=nats-streaming:0.17.0:$SHA
kubectl set image deployments/orders-depl orders=iceshop/orders:$SHA
kubectl set image deployments/orders-mongo-depl orders-mongo=mongo:$SHA
kubectl set image deployments/payments-depl payments=iceshop/payments:$SHA
kubectl set image deployments/payments-mongo-depl payments-mongo=mongo:$SHA
kubectl set image deployments/tickets-depl tickets=iceshop/tickets:$SHA
kubectl set image deployments/tickets-mongo-depl tickets-mongo=mongo:$SHA